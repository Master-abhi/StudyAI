const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for expensive AI API endpoints (Groq / Gemini / Claude).
 * Limits each IP / User to 30 requests per 15-minute window.
 */
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many AI requests. Please wait 15 minutes before making more AI requests.'
  }
});

/**
 * General API rate limiter for standard public endpoints.
 * Limits each IP to 150 requests per 15-minute window.
 */
const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try again later.'
  }
});

/**
 * Rate limiter specifically for authentication / OTP request endpoints.
 * Limits each IP to 5 OTP requests per 15 minutes to prevent SMS/OTP spam.
 */
const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many OTP requests. Please try again after 15 minutes.'
  }
});

module.exports = {
  aiRateLimiter,
  generalRateLimiter,
  otpRateLimiter
};
