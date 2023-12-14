import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";

const EmailConfirmationModal = ({ isOpen, onClose }) => (
  <Modal open={isOpen} onClose={onClose}>
    <Card className="email-confirmation-modal">
      <CardHeader title="Email Verification" />
      <CardContent>
        <Typography variant="body1">
          Please check your email to verify your account.
        </Typography>
      </CardContent>
      <CardActions>
        <div className="modal-footer">
          <Button
          variant="contained"
            type="button"
            data-bs-dismiss="modal"
            onClick={onClose}
          >
            Okay
          </Button>
        </div>
      </CardActions>
    </Card>
  </Modal>
);

export default EmailConfirmationModal;
