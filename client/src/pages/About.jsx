import Banner1 from "../assets/banner5.jpg";

export default function About() {
  return (
    <main className="text-tc">
      <section
        className="flex justify-center h-[90vh] bg-no-repeat bg-cover bg-center items-center"
        style={{ backgroundImage: `url(${Banner1})` }}
      >
        <h1 className="flex justify-center text-bgc font-semibold text-5xl sm:text-8xl w-[80vw]">
          <span>ABOUT US!</span>
        </h1>
      </section>
    </main>
  );
}
