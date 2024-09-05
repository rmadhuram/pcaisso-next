import styles from "./faq.module.scss";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function FAQ() {
  return (
    <div className={styles.faq}>
      <div className="container">
        <h2>Frequently Asked Questions</h2>

        <Accordion activeIndex={0}>
          <AccordionTab header="Why many images look like they were drawn by a 3-year-old?">
            <p className="m-0">
              The quality of the generated images can sometimes be limited by
              the current capabilities of large language models (LLMs). While
              they are powerful tools, they might not always interpret visual
              instructions with the precision needed for complex artwork. You
              can improve the results by experimenting with more detailed
              prompts and refining your inputs.
            </p>
          </AccordionTab>
          <AccordionTab header="How can I generate better results?">
            <p className="m-0">
              To enhance the quality of your outputs, try using more specific
              and detailed prompts. It is also beneficial to have an
              understanding of basic drawing primitives and frameworks. For 2D
              art, familiarize yourself with HTML Canvas and SVG; for 3D,
              explore tools like Three.js and D3.js. This knowledge will help
              you craft prompts that guide the LLM more effectively.
            </p>
          </AccordionTab>
          <AccordionTab header="How far can we push this technology?">
            <p className="m-0">
              The possibilities are vast, but they do come with some
              limitations. By combining creative prompting with a solid
              understanding of coding and visual frameworks, you can produce
              intricate and engaging artwork. As LLMs continue to improve, the
              quality and complexity of generated art will evolve, offering even
              more exciting possibilities in the future.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}
