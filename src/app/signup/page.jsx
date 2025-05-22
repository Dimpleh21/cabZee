export default function SignUp() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Sign Up</h1>
      <form className="flex flex-col items-center mt-10">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 p-2 mb-4 w-1/2"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 mb-4 w-1/2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 mb-4 w-1/2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
