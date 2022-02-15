import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi"
import { signIn, useSession } from 'next-auth/react'

import styles from "./styles.module.scss";

export function SignInButton() {
  const [session] = useSession() // para mostrar se o usuario está logado, porque quando está e não está, os botões são diferentes

  // aqui diz se o usuário estiver logado, mostra ESSE BOTAO.
  return session ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" /> {/**icone do botao do github */}
      Julie Moura
      <FiX color= "#737380" className={styles.closeIcon}/> {/**icone do botao de fechar */}
    </button>
  ) :/** se nao, mostra ESSE BOTAO.*/ ( 
    <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
      <FaGithub color="#eba417" />
      Sign In with Github
    </button>
  );
}
