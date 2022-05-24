import React from 'react'
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core'
import { Check, BrandGithub } from 'tabler-icons-react'
import image from '../../assets/bionic.svg'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}))

export function Home() {
  const { classes } = useStyles()
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> Bionic reading
              tool
            </Title>
            <Text color="dimmed" mt="md">
              Bionic Reading means Fixation, Saccade and Opacity. With the
              Fixation you define the expression of the letter combinations.
              Fixation takes into consider the respective word length and
              categorizes them into long, medium-length and short words. With
              the Saccade you define the visual jumps from Fixation to Fixation.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Fixation</b> – With the Fixation you define the expression of
                the letter combinations.
              </List.Item>
              <List.Item>
                <b>Saccade</b> – With the Saccade you define the visual jumps
                from Fixation to Fixation.
              </List.Item>
              <List.Item>
                <b>Opacity</b> – With the Opacity you define the visibility of
                your Fixation.
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to={'/playground'}>
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
              </Link>
              <a
                href="https://github.com/crisanlucid/vite-react-tailwind-bionic-reading"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  <Group spacing={5}>
                    <BrandGithub />
                    Source code
                  </Group>
                </Button>
              </a>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  )
}
