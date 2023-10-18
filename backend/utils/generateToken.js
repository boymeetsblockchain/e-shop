import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    path:'/',
    httpOnly: true,
    secure: false, // Use secure cookies in production
    sameSite: "none", // Prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  });

  console.log('JWT cookie set:', token);
};

export default generateToken