import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	categoryMutations,
	categoryQueries,
	categoryTypeDef,

	userTypeDef,
	userMutations
} from './swarch2023i/categories/typeDefs';

// Right here could appear a new error with the code I just made
import categoryResolvers from './swarch2023i/categories/resolvers';
import userResolvers from './swarch2023i/categories/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		userTypeDef
	],
	[
		categoryQueries
	],
	[
		categoryMutations,
		userMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		userResolvers
		//DON'T FORGET PUT userResolvers when I have my apigateway done
	)
});
