import { useNavigate, useParams } from "react-router-dom";
import { useGetOneCampsite } from "../../hooks/api/campsites/useGetOneCampsite.jsx";
import AppSkeleton from "../common/loading/Skeleton.jsx";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useCreateCampsite } from "../../hooks/api/campsites/useCreateCampsite.jsx";
import { useUpdateCampsite } from "../../hooks/api/campsites/useUpdateCampsite.jsx";
import { toast } from "react-toastify";
import { CampsiteForm } from "./CampsiteForm.jsx";
import AddIcon from '@mui/icons-material/Add';

export const CampsiteEdit = () => {
  const { id } = useParams();
  const { data: campsite, isLoading, error } = useGetOneCampsite(id);
  const { mutate, isPending } = useUpdateCampsite();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !campsite && error) {
      toast.error("Campsite not found");
      setTimeout(() => {
        navigate("/app/admin");
      }, 2000);
    }
  }, [isLoading, campsite, error]);

  if (isLoading) return <AppSkeleton />;

  return (
    <Box>
 <Typography variant="h4" align="center" sx={{ my: 4 }}>
            Edit Campsite 
          </Typography>      <Box style={{ height: "4rem" }} />
      <CampsiteForm
        campsite={campsite}
        isLoading={isPending}
        submitButtonText={"Edit campsite"}
        mutate={mutate}
      />
    </Box>
  );
};

export const CampsiteCreate = () => {
  const { mutate, isPending } = useCreateCampsite();

  return (
    <Box>
      {" "}
     
      <Typography variant="h4" align="center" sx={{mb:-10  }}>
            <AddIcon />   Create a new Campsite
          </Typography>  
      <CampsiteForm
      
        mutate={mutate}
        isLoading={isPending}
        submitButtonText={"Create campsite"}
      />
    </Box>
  );
};
