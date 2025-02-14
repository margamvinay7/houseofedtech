export default function Footer() {
  return (
    <div className="bg-[rgb(58,36,74)] text-white py-6 float">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Margam Vinay
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/margamvinay7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mvsk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
