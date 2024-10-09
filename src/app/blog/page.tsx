import styles from './blog.module.scss'

export default function Blog() {
  return <div className={styles.blog}>
    <section className="blog-post">
      <h1>What is Pcaisso?</h1>
      <div className="date">2023-04-24</div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/dR15JPmaHPE?si=ZL400LwD4bkKjaWK" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      <p>Introducing Pcaisso: an AI code + art generator based on ChatGPT! </p>
      <p>ChatGPT has an incredible ability to generate code, and I was captivated by its code generation capabilities, especially when it comes to drawing. I was very much determined to see just how far we could push the limits of GPT-3&apos;s artistic potential!</p>
      <p>And guess what? In the last few days, I&apos;ve been testing out some prompts and the results were truly breathtaking! Some of the visuals that ChatGPT was able to generate left me absolutely speechless! I&apos;m so thrilled to finally share the results with you all in the attached video. Get ready to be amazed!</p>
      <p>However, this is just a hack, and it would fail more than 60% of the time :). I am hoping GPT-4 will take it to the next level, judging by what I read in the Sparks of AGI paper. I had applied for access but haven’t got it yet. Fingers crossed OpenAI will approve my application soon.</p> 
      <p>I believe this could be a valuable tool for LLM researchers, and tinkerers. If you like to play with it, please leave a comment. I am thinking of making it open-source, and possibly hosting it online for people to tinker. We want to add a lot of features and looking forward to inviting collaborators from the broader community!</p>
    </section>
  </div>
}