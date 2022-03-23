import { Button, Grid, List, ListItem, ListItemText, Typography, Card, makeStyles, Link, Box, FormControl, InputLabel, Select, Menu, MenuItem, Divider, CardContent } from "@material-ui/core";
import Layout from "../../../components/Layout";
import axios from 'axios'
import AverageReview from "../../../components/AverageReview";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '75px',
        maxWidth: '95vw',
        padding: '0 25px'
    },
    addReview: {
        marginTop: '15px',
    },
    description: {
        paddingTop: '15px'
    },
    clearFilter: {
        marginTop: '15px'
    },
    list: {
        margin: '0 auto'
    },
    card: {
        marginTop: '25px'
    }
}))

export default function BusinessPage({business, averageReviews}) {
    const classes = useStyles()

    const [reviewFilter, setReviewFilter] = useState('')


    return (
        <Layout>
            <Grid container className={classes.root}>
                <Grid item xs={12} md={6}>
                    <Typography variant='h2'>{business.name}</Typography>
                    <Typography variant='h4'>{business.price_range}</Typography>
                    <AverageReview value={averageReviews}></AverageReview>

                    <div className={classes.addReview}>
                        <Button variant='contained' color='primary'>Write a Review</Button>
                    </div>

                    <div className={classes.description}>
                        <Typography variant='p'>{business.description}</Typography>
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <List>
                            <ListItem>
                                <ListItemText primary='Website' secondary={business.website}></ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText primary='Address' secondary={`${business.street_address} ${business.city}, ${business.region}`}></ListItemText>
                            </ListItem>
                            
                            <ListItem>
                                <ListItemText primary='Phone' secondary={business.phone}></ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText primary='Hours' secondary={business.hours} ></ListItemText>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>

            <Grid container className={classes.root}>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Filter the Reviews</Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='reviews'>Review</InputLabel>
                                    <Select
                                        labelId='reviews'
                                        id='reviewComponent'
                                        value={reviewFilter}
                                        onChange={e => setReviewFilter(e.target.value)}
                                    >
                                        <MenuItem value={1}>1+ Stars</MenuItem>
                                        <MenuItem value={2}>2+ Stars</MenuItem>
                                        <MenuItem value={3}>3+ Stars</MenuItem>
                                        <MenuItem value={4}>4+ Stars</MenuItem>
                                        <MenuItem value={5}>5+ Stars</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <Button variant='outlined' color='secondary' className={classes.clearFilter} onClick={() => setReviewFilter('')}>Clear Filters</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={8} className={classes.list}>
                    {business && business.reviews && business.reviews.map(review => (
                        reviewFilter <= review.stars && (
                            <Card className={classes.card}>
                            <Box>
                                <CardContent>
                                    <AverageReview value={review.stars} />
                                    <Typography variant='h5'>{review.title}</Typography>
                                    <Typography variant='subtitle1'>{review.content}</Typography>
                                </CardContent>
                            </Box>
                        </Card>
                        )
                    ))}
                </Grid>

            </Grid>
        </Layout>
    )
}

export async function getServerSideProps({ query: {slug} }) {
    const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)

    let avgReview = null

    if (data && data.results && data.results[0].reviews) {
        let totalReviewStars = 0
        for (let i = 0; i < data.results[0].reviews.length; i++) {
            totalReviewStars = totalReviewStars + Number(data.results[0].reviews[i].stars)
        }

        const inverse = 1 / 2

        avgReview = Math.round((totalReviewStars / data.results[0].reviews.length) / inverse) * inverse
    }
  
    return {
        props: {
            business: data.results[0] || null,
            averageReviews: avgReview
        }
    }
}



