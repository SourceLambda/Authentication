import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	// categoryMutations,
	// categoryQueries,
	// categoryTypeDef,

	userTypeDef,
	userQueries,
	userMutations,

	userloginTypeDef,
	userloginMutations
} from './auth_ag/typeDefs';

// Right here could appear a new error with the code I just made
//import categoryResolvers from './swarch2023i/categories/resolvers';
import userResolvers from './auth_ag/resolvers';
//import userLoginResolvers from './swarch2023i/categories/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		//categoryTypeDef,
		userTypeDef,
		userloginTypeDef
	],
	[
		//categoryQueries,
		userQueries
	],
	[
		//categoryMutations,
		userMutations,
		userloginMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		//categoryResolvers
		userResolvers
		//userLoginResolvers
		//DON'T FORGET PUT userResolvers when I have my apigateway done
	)
});
