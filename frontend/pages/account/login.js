import { Grid, Card, CardHeader, Avatar, makeStyles, Typography, CardContent, TextField, Button, Snackbar } from '@material-ui/core'
import Layout from '../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import Link from 'next/link'
import transitions from '@material-ui/core/styles/transitions'
import { useState, useContext, useEffect } from 'react'
import AuthenticationContext from '../../context/AuthenticationContext'

const useStyle = makeStyles((theme) => ({
    root: {
        margin: '75px auto',
        maxWidth: '95vw',
    },
    form: {
        marginTop: '35px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '0 10px',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
        margin: '0 auto',
    },
    title: {
        marginBottom: '8px',
    },
    input: {
        margin: '15px 0'
    },
    linkContainer: {
        margin: '15px 0'
    },
    link: {
        color: '#0645AD',
        transitions: '0.3s',
        '&:hover': {
            color: '#3366BB',
            transitions: '0.3s'
        }
    }
}))

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const classes = useStyle()
    const router = useRouter()

    const {login, error, clearError } = useContext(AuthenticationContext)

    useEffect(() => {
        if (error) {
            setErrorMessage(error)
            setOpen(true)
            clearError()
        }
    }, [error])

    const submitHander = (e) => {
        e.preventDefault();
        login({username, password})
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Layout>
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            message={errorMessage}
            key={'top_center'}
            />
            <div className={classes.root}>
                <div className={classes.form}>
                    <Typography variant='h3' className={classes.title}>Login</Typography>
                    <Card>
                        <CardContent>
                            <form onSubmit={submitHander}>
                                <div className={classes.input}>
                                    <TextField label='Username' fullWidth onChange={e => setUsername(e.target.value)} value={username}/>
                                </div>

                                <div className={classes.input}>
                                    <TextField label='Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword(e.target.value)} value={password}/>
                                </div>

                                <div className={classes.input}>
                                    <Button variant='contained' color='primary' type='submit'>Login</Button>
                                </div>

                                <div className={classes.linkContainer}>
                                    <Link href='/account/register'>
                                        <a className={classes.link}>Don't have an account? Sign Up</a>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

// export async function getServerSideProps() {
//   // fetch our data
//   const { data } = await axios.get('http://localhost:8000/categories')

//   return {
//     props: {
//       categories: data.results
//     }
//   }
// }