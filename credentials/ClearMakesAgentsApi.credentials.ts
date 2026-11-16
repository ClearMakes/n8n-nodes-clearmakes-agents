import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ClearMakesAgentsApi implements ICredentialType {
	name = 'clearMakesAgentsApi';

	displayName = 'ClearMakes Agents API';

	icon: Icon = { light: 'file:../icons/clearmakes.svg', dark: 'file:../icons/clearmakes.dark.svg' };

	documentationUrl = 'https://agents.clearmakes.com/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'An API key created inside your agent (Agent > Sources > API keys). It starts with ck_live_.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://agents.clearmakes.com/api/v1/brain',
			url: '/me',
			method: 'GET',
		},
	};
}
