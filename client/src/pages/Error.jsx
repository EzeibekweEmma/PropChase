import ErrorPage from "../assets/errorPage.png";
export default function Error() {
  return (
    <main>
      <section className="flex justify-center">
        <section
          className=" w-[80vw] min-h-startingH bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${ErrorPage})` }}
        ></section>
      </section>
    </main>
  );
}
