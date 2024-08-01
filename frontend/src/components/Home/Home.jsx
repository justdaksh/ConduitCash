import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="text-center mb-12">
        <div className="w-96 h-24 flex justify-center items-center mx-auto">
          <img className="object-contain" src="conduit.png" alt="Logo Here" />
        </div>
        <p className="text-xl text-gray-600 mt-4">
          Streamline Your Finances with ConduitCash
        </p>
      </div>

      <div className="space-y-6 w-full max-w-md">
        <button
          onClick={handleSignup}
                    className="w-full py-3 px-6 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sign Up
        </button>

        <button
          onClick={handleLogin}
                    className="w-full py-3 px-6 text-lg font-semibold text-gray-800 bg-white border-2 border-gray-800 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Log In
        </button>
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>Experience seamless transactions with ConduitCash</p>
        <p className="mt-2">Join millions of satisfied users today!</p>
      </div>
    </div>
  );
}
