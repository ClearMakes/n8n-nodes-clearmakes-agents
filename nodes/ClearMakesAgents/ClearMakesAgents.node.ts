import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class ClearMakesAgents implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ClearMakes Agents',
		name: 'clearMakesAgents',
		icon: { light: 'file:../../icons/clearmakes.svg', dark: 'file:../../icons/clearmakes.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Ask your ClearMakes agent questions and search the knowledge it can read',
		defaults: {
			name: 'ClearMakes Agents',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'clearMakesAgentsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://agents.clearmakes.com/api/v1/brain',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Ask Agent',
						value: 'ask',
						action: 'Ask the agent a question',
						description: 'Get an answer grounded in the agent knowledge',
						routing: {
							request: {
								method: 'POST',
								url: '/ask',
								body: {
									question: '={{$parameter["question"]}}',
									top_k: '={{$parameter["topK"]}}',
								},
							},
						},
					},
					{
						name: 'Search Knowledge',
						value: 'search',
						action: 'Search the agent knowledge',
						description: 'Find passages the agent can read',
						routing: {
							request: {
								method: 'GET',
								url: '/search',
								qs: {
									q: '={{$parameter["query"]}}',
									top_k: '={{$parameter["topK"]}}',
								},
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: { property: 'results' },
									},
								],
							},
						},
					},
					{
						name: 'Get Key Details',
						value: 'me',
						action: 'Get details of the API key',
						description: 'Show which workspace and knowledge the key can read',
						routing: {
							request: {
								method: 'GET',
								url: '/me',
							},
						},
					},
				],
				default: 'ask',
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				typeOptions: { rows: 4 },
				required: true,
				default: '',
				placeholder: 'What are your support hours?',
				description: 'The question for the agent, up to 4,000 characters',
				displayOptions: { show: { operation: ['ask'] } },
			},
			{
				displayName: 'Search Query',
				name: 'query',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'refund policy',
				displayOptions: { show: { operation: ['search'] } },
			},
			{
				displayName: 'Passages to Use',
				name: 'topK',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 20 },
				default: 8,
				description: 'How many knowledge passages to read, between 1 and 20',
				displayOptions: { show: { operation: ['ask', 'search'] } },
			},
		],
	};
}
