import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";

const AppModal = ({ isOpen, onClose, title, body }) => (
    <Modal open={isOpen} onClose={onClose}
        style={{
            display: 'flex',
            justifyContent: 'center', 
            marginTop: '2vh',
        }}>
        <Card style={{
            width: '30vw',
            height: '10vw'        }}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body1">{body}</Typography>
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

export default AppModal;
