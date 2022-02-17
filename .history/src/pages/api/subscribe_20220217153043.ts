import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react'
import { stripe } from "../../../services/stripe";

//request e response.
export default async(req: NextApiRequest, res: NextApiResponse) => {
    // só vamos aceitar se o metodo da requisição for post, porque sempre que está criando algo no backend é POST.
    if(req.method == 'POST') {
        const session = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email, // pegando o email do user
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id, // estamos criando o cliente lá no stripe
            payment_method_types: ['card'], // metodos de pagamentos aceitos, via cartão de credito nesse caso.
            billing_address_collection: 'required', // obriga ao usuario ao colocar o endereço
            line_items: [
                { price: 'price_1KTSpTEvgcWRi2q2gzSI2UAs', quantity: 1 } // o unico produto vendido
            ],
            mode: 'subscription', // porque é um pagamento recorrente, pois é um plano de assinatura, então todo mês terá que pagar
            allow_promotion_codes: true, // isso permite que promoções de desconto cheguem ao usuario
            success_url: process.env.STRIPE_SUCCESS_URL, // para onde o usuario precisa ser redirecionado caso dê sucesso na compra
            cancel_url: process.env.STRIPE_CANCEL_URL // para onde o usuario precisa ser redirecionado caso cancele a requisição, redirecionamos de volta pra home
        })
        // caso dê certo, vai passar um resultado 200(sucesso)
        return res.status(200).json({ sessionId: stripeCheckoutSession })

    // se NÃO for uma requisição do método post
    } else {
        res.setHeader('Allow', 'POST'); // esse response(resposta) tá explicando pro front que essa requisição só aceita POST(allow post)
        res.status(405).end('Method not allowed') // ai vai dar o erro 405 (metodo nao permitido)
    }
}