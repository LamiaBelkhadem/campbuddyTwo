import { Stack, Typography } from "@mui/material";
import { useGetAllCampsites } from "../../hooks/api/campsites/useGetAllCampsites.jsx";
import AppSkeleton from "../common/loading/Skeleton.jsx";
import CampsiteCard from "./CampsiteCard.jsx";

const CampsitesList = () => {
  const { data: campsites, isLoading } = useGetAllCampsites();

  if (isLoading) return <AppSkeleton />;

  return (
    <Stack>
      {campsites.length === 0 ? (
        <Typography>No campsites are found</Typography>
      ) : (
        campsites.map((campsite) => (
          <CampsiteCard key={campsite._id} campsite={campsite} />
        ))
      )}
    </Stack>
  );
};

export default CampsitesList;
