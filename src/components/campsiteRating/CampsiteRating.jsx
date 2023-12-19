import Add from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAddCampsiteReview } from "../../hooks/api/campsites/useAddCampsiteReview.jsx";
import { useGetOneCampsiteWithReviews } from "../../hooks/api/campsites/useGetOneCampsiteWithReviews.jsx";
import useDisclosure from "../../hooks/useDisclosure.jsx";
import "./campsiteRating.css";

const initialValues = {
  rating: "",
  content: "",
};

const addReviewSchema = Yup.object().shape({
  rating: Yup.number().required("Please select a rating"),
  content: Yup.string().required("Please enter a review"),
});

export default function CampsiteRating({ campsiteId }) {
  const { data: reviews, isLoading } = useGetOneCampsiteWithReviews(campsiteId);
    const { mutate: addReview } = useAddCampsiteReview(campsiteId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitReview = async (values) => {
      console.log("rating:", values.rating);
      const review = {
      rate: values.rating,
      content: values.content,
    };

    await addReview(review, {
      onSuccess: () => {
        onClose();
      },
    });
  };

    console.log("reviews",reviews)
  if (isLoading) {
    return (
      <div className="reviews-container">
        <div className="section-header"> Reviews:</div>
        <div className="loading">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <div className="section-header-container">
        <div className="section-header"> Reviews:</div>
        <Button
          startIcon={<Add color="primary" />}
          className="review-btn"
          data-bs-target="#reviewModal"
          color="primary"
          onClick={onOpen}
          variant="contained"
        >
          Add a Review
        </Button>

        <div
          className="modal fade"
          id="reviewModal"
          tabIndex="-1"
          aria-labelledby="reviewModalLabel"
          aria-hidden="true"
        >
          <Dialog
            className="modal-dialog"
            open={isOpen}
            sx={{
              width: "100vw",
            }}
          >
            <DialogTitle className="modal-header">
              <Typography
                variant={"h5"}
                className="modal-title"
                id="reviewModalLabel"
              >
                Leave a Review
              </Typography>
              <Button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></Button>
            </DialogTitle>
            <DialogContent
              sx={{
                width: 500,
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={addReviewSchema}
                onSubmit={submitReview}
              >
                {({}) => (
                  <Form>
                    <Stack direction="row">
                      <InputLabel
                        htmlFor="review-rating"
                        className="col-form-label"
                      >
                        Rating:
                      </InputLabel>
                      <Field
                        fullWidth
                        as={Select}
                        className="form-select"
                        id="review-rating"
                        name="rating"
                      >
                        <MenuItem value={0} disabled>
                          Choose a rating
                        </MenuItem>
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <MenuItem key={i} value={i + 1}>
                              {i + 1} Stars
                            </MenuItem>
                          ))}
                      </Field>
                    </Stack>
                    <div className="mb-3">
                      <label htmlFor="review-text" className="col-form-label">
                        Review:
                      </label>
                      <Field
                        minRows={13}
                        as={TextareaAutosize}
                        className="form-control"
                        id="review-text"
                        name={"content"}
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
        </div>
      </div>
      {reviews?.length > 0 ? (
        reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
                    <span className="reviewer-name">{review.user?.username}</span>
              <div className="review-rating">
                {[...Array(5)].map((star, i) => (
                  <i
                    key={i}
                    className={
                      i < review.rate
                        ? "fa fa-star star-filled"
                        : "fa fa-star-o star-empty"
                    }
                    aria-hidden="true"
                  ></i>
                ))}
              </div>
            </div>
            <div className="review-text">{review.content}</div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}
