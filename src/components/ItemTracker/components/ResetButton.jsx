import { CircularProgress, IconButton, Box, Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import { useState } from 'react';

function ResetButton({ resetTracker }) {
	const [progress, setProgress] = useState(0);
	const [isPressing, setIsPressing] = useState(false);
	const [timerId, setTimerId] = useState(null);
	const [resetSuccess, setResetSuccess] = useState(false);

	const handleMouseDown = () => {
		setIsPressing(true);

		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				const newProgress = prevProgress + 5;
				if (newProgress > 110) {
					setResetSuccess(true);
					clearInterval(interval);
					setProgress(0);
					resetTracker();
				}
				return newProgress;
			});
		}, 100);
		setTimerId(interval);
	};

	const handleMouseUp = () => {
		setIsPressing(false);
		clearInterval(timerId);
		if (progress < 100) {
			setProgress(0);
		}
	};

	if (resetSuccess) {
		setTimeout(() => {
			setResetSuccess(false);
		}, 4000);
	}

	return (
		<Tooltip
			title="Hold to Reset Tracker"
			arrow
			disableInteractive
			placement="top"
		>
			<Box position="relative" display="inline-flex">
				{isPressing && (
					<CircularProgress
						variant="determinate"
						value={progress}
						size={34}
						sx={{
							position: 'absolute',
							color: 'error.main',
						}}
					/>
				)}
				<IconButton
					size="small"
					disabled={resetSuccess}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
				>
					{resetSuccess ? (
						<CheckCircleIcon sx={{ color: 'success.main' }} />
					) : (
						<ReplayIcon sx={{ color: 'error.main' }} />
					)}
				</IconButton>
			</Box>
		</Tooltip>
	);
}

export default ResetButton;

if (!import.meta.env.PROD) {
	ResetButton.propTypes = {
		resetTracker: PropTypes.func.isRequired,
	};
}
