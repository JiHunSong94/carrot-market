export default function Home() {
  return (
    <form className="flex flex-col space-y-2 p-5 focus-within:bg-blue-100">
      <input
        type="text"
        required
        placeholder="Username"
        className="peer rounded border border-gray-400 p-1"
      />
      <span className="hidden peer-valid:text-teal-500">Awesome Username</span>
      <span className="hidden peer-hover:block peer-hover:text-amber-500">
        Hello
      </span>
      <input type="submit" value="Login" className="bg-white" />
    </form>
  );
}
