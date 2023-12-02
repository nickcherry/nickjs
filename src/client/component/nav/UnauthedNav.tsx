function UnauthedNav() {
  return (
    <>
      <div className="flex flex-row gap-6">
        <a title="Home" href="/">
          Home
        </a>
      </div>
      <div>
        <a href="/login">Login</a>
      </div>
    </>
  );
}

export { UnauthedNav };
