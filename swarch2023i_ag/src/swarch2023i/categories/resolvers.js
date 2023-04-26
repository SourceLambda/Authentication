import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const url_create_user = '172.17.0.1'
const port_create_user = '3000'
const entryPoint_create_user = 'api/v1/users'

const URL_CREATE_USER = `http://${url_create_user}:${port_create_user}/${entryPoint_create_user}`;

const resolvers = {
	Query: {
		allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE'),

		createUser:(_,{ user })=>
			generalRequest(`${URL_CREATE_USER}/`, 'POST', user),
	}
};

export default resolvers;
