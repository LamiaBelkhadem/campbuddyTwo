import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CampsitesList from "../../components/CampsiteList";
import { Link } from "react-router-dom";
import AuthenticatedLayout from "../../components/common/layouts/AuthenticatedLayout.jsx";

const Dashboard = () => {
  return (
    <AuthenticatedLayout sidebar={false}>
      <Box style={{ height: 50 }} />
      <Container>
        <Card>
          <CardHeader title={"Campsites"} />
          <CardContent>
            <CampsitesList />
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={"/app/admin/campsite/new"}
              startIcon={<Add />}
            >
              Add campsite
            </Button>
          </CardActions>
        </Card>
      </Container>

      {/*<Card>*/}
      {/*	<CardHeader title={"Campers"} />*/}
      {/*	<CardContent>*/}
      {/*		<CampersList />*/}
      {/*	</CardContent>*/}
      {/*</Card>*/}
    </AuthenticatedLayout>
  );
};

export default Dashboard;
