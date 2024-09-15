import styles from './blog.module.scss'

export default function Blog() {
  return <div className={styles.blog}>
    <section className="blog-post">
      <h1>Blog Post 1</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque purus diam, id lobortis purus elementum eu. Cras bibendum lobortis nunc quis auctor. Quisque eu fringilla leo, at ultrices urna. Proin volutpat sapien a mauris hendrerit, in dapibus odio pulvinar. Pellentesque a felis quis quam condimentum lobortis. Sed eleifend libero eget quam ultrices, id luctus diam bibendum. Proin nec dui lectus. Quisque semper in risus sed posuere. Cras imperdiet eros lectus. Donec non lacinia lacus. Etiam bibendum, massa at dictum luctus, purus risus bibendum ex, convallis rhoncus eros quam vel arcu. Pellentesque lacus libero, sollicitudin eget dapibus nec, efficitur sit amet justo. Cras cursus neque id dui posuere tempus.</p>
    </section>
  </div>
}