"use client"
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Link from 'next/link';

export default async function Home() {
  const router = useRouter();
  const req = await fetch("http://localhost:3003/alunos", {
    cache: "no-cache"
  });
  const alunos = await req.json();
 

  const remover = async (id) => {
    try {
      await fetch("http://localhost:3003/alunos/" + id, {
        method: "DELETE"
      })
      router.refresh()
    } catch {
      alert.arguments("Não foi possivél remover!")
    }
  }
  return (
    <main className={styles.main}>
      <body className={styles.corpo}>
      <a className={styles.titulo}><Link href="/cadastro">──── CADASTRAR ────</Link></a>
      {alunos.map(aluno => (
        <div className={styles.fundo1} key={aluno.id}>
          <p className={styles.letras}>{aluno.nome}</p>
          <p className={styles.letras}>{aluno.curso}</p>
          <button className={styles.botao} onClick={e => e.preventDefault(remover(aluno.id))}>REMOVER</button>
        </div>
      ))}
    </body>
    </main>
  )
}
