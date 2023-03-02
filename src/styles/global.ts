import { css } from '@emotion/react';
import { gray, purple } from './palette';

export default css`
	* {
		font-family: pretendard !important;
	}

	em,
	b,
	strong {
		font-weight: bold;
	}

	i {
		font-style: italic;
		padding-right: 2px;
	}

	code {
		background-color: ${gray[200]};
		color: ${purple[40]};
		padding: 3px 6px 1px 6px;
		border-radius: 4px;
	}
`;
