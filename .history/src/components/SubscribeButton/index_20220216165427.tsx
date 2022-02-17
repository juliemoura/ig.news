import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const { data: session } = useSession();  // importando esse useSession que vem do next-auth

    function handleSubscribe() {
        // se não houver uma sessão ativa
        if(!session){
            signIn('github')
            return;
        }
        
    }
    return(
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe now
        </button>
    );
}