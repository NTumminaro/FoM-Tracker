// Libraries & Frameworks ////////////////////////////////////////////////////
import { enqueueSnackbar } from 'notistack';

// Main Hook ////////////////////////////////////////////////////
const useSnackbarHandler = () => {
	const showSnackbar = (message, variant = 'info', maxLength = 50) => {
		const truncatedMessage =
			message.length > maxLength
				? `${message.substring(0, maxLength)}...`
				: message;

		enqueueSnackbar(truncatedMessage, { variant });
	};

	// Return ////////////////////////////////////////////////////
	return showSnackbar;
};

export default useSnackbarHandler;
