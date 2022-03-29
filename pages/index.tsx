import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { Layout } from '../components/layouts/Layout';
import { EntryList } from '../components/ui';
import { NewEntry } from '../components/ui/NewEntry';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - HU Manager'>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={3}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='Pending'/>
            <NewEntry />
            <EntryList status='pending'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='In Development'/>
            <EntryList status='development'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='Testing'/>
            <EntryList status='testing'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='Deployed'/>
            <EntryList status='deployed'/>
          </Card>
        </Grid>

      </Grid>  
    </Layout>
  )
}

export default HomePage;
