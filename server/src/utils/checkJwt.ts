import { expressjwt, GetVerificationKey } from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import dotenv from 'dotenv'

dotenv.config()

const domain = process.env.AUTH0_DOMAIN
const audience = process.env.AUTH0_AUDIENCE

export const checkJwt = expressjwt({
	secret: jwksRsa.expressJwtSecret(
		{
		cache: true,
		// ограничение максимального количества запросов
		rateLimit: true,
		// 10 запросов в минуту
		jwksRequestsPerMinute: 10,
		// обратите внимание на сигнатуру пути
		jwksUri: `https://${domain}/.well-known/jwks.json`
	}
	) as GetVerificationKey,
	// аудитория
	audience,
	// тот, кто подписал токен
	issuer: `https://${domain}/`,
	// алгоритм, использованный для подписания токена
	algorithms: ['RS256']
})

// export const checkJwt = expressjwt({
// 	secret: jwksRsa.expressJwtSecret({
// 		cache: true,
// 		// ограничение максимального количества запросов
// 		rateLimit: true,
// 		// 10 запросов в минуту
// 		jwksRequestsPerMinute: 10,
// 		// обратите внимание на сигнатуру пути
// 		jwksUri: `https://${domain}/.well-known/jwks.json`
// 	}),
// 	// аудитория
// 	audience,
// 	// тот, кто подписал токен
// 	issuer: `https://${domain}/`,
// 	// алгоритм, использованный для подписания токена
// 	algorithms: ['RS256']
// })