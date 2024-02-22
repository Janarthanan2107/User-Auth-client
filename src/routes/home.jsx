const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="bg-blue-400 text-black font-semibold rounded-xl p-8">
        Welcome {user ? user.username : "Guest"}
      </div>
    </div>
  );
};

export default Home;
