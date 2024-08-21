/* eslint-disable */
export default {
	displayName: 'app-backend',
	preset: '../../jest.preset.js',
	testEnvironment: 'node',
	detectOpenHandles: true,
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{ tsconfig: '<rootDir>/tsconfig.spec.json' },
		],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/app/backend',
};
