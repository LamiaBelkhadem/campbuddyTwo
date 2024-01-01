import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { useAddProfileReview } from "../../hooks/api/profile/useAddProfileReview";
import { useDeleteProfileReview } from "../../hooks/api/profile/useDeleteProfileReview";
import useDisclosure from "../../hooks/useDisclosure";
import useAuth from "../../hooks/useAuth";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
const initialValues = {
  rating: "",
  comment: "",
};

const ReviewsList = ({
  bool,
  reviews,
  onAddReview,
  deleteReview,
  onOpen,
  onClose,
  isOpen,
}) => {
  const { user } = useAuth();
  console.log(user);
  console.log("bool2", bool)
  return (
    <Fragment>
      <Card>
        <CardContent>
          <Box
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Reviews</Typography>
            {!bool && (<Button onClick={onOpen}>
              <AddIcon />
            </Button>)}
          </Box>
          <Divider style={{ margin: "10px 0" }} />

        
          {reviews?.length > 0 ? (
  reviews.map((review, index) => (
    <div className="review-card" key={index}>
      <div className="review-header">
        <span className="reviewer-name">{review.user?.username}</span>
        <div className="review-rating">
          {[...Array(5)].map((_, i) => {
            // Debugging: Log the rate and compare value
            console.log(`Rate: ${review?.rating}, Compare: ${i < review?.rating}`);
            return (
              i < review?.rating ? (
                <StarIcon sx={{color:'#ffc107 !important'}} key={i} />
              ) : (
                <StarBorderIcon  sx={{color:'#ffc107 !important'}}key={i} />
              )
            );
          })}
        </div>
      </div>
      <div className="review-text">{review.comment}</div>
    </div>
  ))
) : (
  
  bool ? (
    <p>No reviews yet. Be the first to review!</p>
  ) : (
    <p>No reviews yet.</p>
  )
  
)}
        </CardContent>
      </Card>

      <Dialog
        className="modal-dialog"
        open={isOpen}
        sx={{
          width: "600px",
          alignContent:"center"
        }}
      >
        <DialogTitle className="modal-header">
          <Typography
            variant={"h5"}
            className="modal-title"
            id="reviewModalLabel"
            style={{ fontWeight: "bold" }}
          >
            Review Camper
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
          }}
        >
          <Formik initialValues={initialValues} onSubmit={onAddReview}>
            {({}) => (
              <Form>
                <Stack direction="row">
                  <div className="rating-field-campsite">
                    <InputLabel
                      htmlFor="review-rating"
                      className="col-form-label"
                      style={{ marginBottom: "10px" }}
                    >
                      Rating:
                    </InputLabel>
                    <Field
                      fullWidth
                      as={Select}
                      className="form-select"
                      id="review-rating"
                      name="rating"
                      style={{ height: "50px", marginTop: "15px" }}
                    >
                      <MenuItem value={0} disabled>
                        Choose a rating
                      </MenuItem>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <MenuItem key={i} value={i + 1}>
                            {i + 1} Star(s)
                          </MenuItem>
                        ))}
                    </Field>
                  </div>
                </Stack>
                <div className="mb-3" style={{}}>
                  <label htmlFor="review-text" className="col-form-label">
                    Review:
                  </label>
                  <Field
                    minRows={13}
                    as={TextareaAutosize}
                    className="form-control"
                    style={{ height: "15vw" }}
                    id="review-text"
                    name={"comment"}
                    placeholder="Share your experience with us..."
                  ></Field>
                </div>
                <Stack direction="row" columnGap={3}>
                  <Button
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={onClose}
                    variant="outlined"
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="contained">
                    Submit Review
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const ProfileReviews = ({ profile, bool }) => {
  const { mutate: addReview } = useAddProfileReview(profile?._id);
  console.log("bool1", bool)
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { mutate: deleteReview } = useDeleteProfileReview(profile?._id);

  const onAddReview = (values) => {
    addReview(
      { rating: values.rating, comment: values.comment },
      {
        onSuccess: () => {
          toast.success("Review was added");
          onClose();
        },
        onError: () =>
          toast.error("Failed to add a review, you can only review once"),
      }
    );
  };

  const onDeleteReview = () => {
    deleteReview(undefined, {
      onSuccess: () => toast.success("Review was deleted successfully"),
      onError: () => toast.error("Failed to delete review"),
    });
  };

  return (
    <ReviewsList
        bool={bool}
      reviews={profile?.reviews}
      onAddReview={onAddReview}
      deleteReview={onDeleteReview}
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
    />
  );
};

export default ProfileReviews;
