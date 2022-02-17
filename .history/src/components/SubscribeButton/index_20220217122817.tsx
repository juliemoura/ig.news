import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const { data: session } = useSession();  // importando esse useSession que vem do next-auth

    async function handleSubscribe() {
        // se não houver uma sessão ativa
        if(!session){
            signIn('github')
            return;
        }
        try {
            const response = await api.post('/subscribe') // o nome da rota que ele vai ser criado
            
            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout(sessionId)
        } catch(err) {
            alert(err.message);
        }
    }
    return(
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe now
        </button>
    );
}