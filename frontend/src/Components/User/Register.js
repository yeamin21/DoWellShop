export default function Register(props) {
  return (
    <div>
      <form>
        <label for="username">Username</label>
        <input type="text" name="username" />
        <label for="email">email</label>
        <input type="email" name="email" />
        <label for="password">Password</label>
        <input type="password" name="password" />
        <input type="submit" />
      </form>
    </div>
  );
}
