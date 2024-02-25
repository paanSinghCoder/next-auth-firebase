export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-4xl font-bold opacity-80 mt-12 px-3">
          Next-Auth with Firebase
        </h1>
        <p className="opacity-50 text-xl font-normal mt-8 px-3">
          This is a public landing page. /dashboard is protected. Go to /login
          to register or login.
        </p>
        <p className="font-normal mt-6 text-md">Gaurav Singh</p>
      </div>
    </>
  );
}
