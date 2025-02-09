import * as React from 'react';

import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import { render } from '@react-email/render';

export interface Props {
    subject: string;
    recipientName?: string;
    paragraphs: string[];
}

const logo =
    'https://num.technanimals.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.c5e12614.png&w=640&q=75';

const info = {
    address: '123 Main street, Cityville, State 56789',
    phone: '(+27) 123-4567',
    email: 'info@erecruitment.com',
    website: 'www.num.com',
};

function EmailTemplate({ subject, recipientName, paragraphs }: Props) {
    return (
        <Html>
            <Head />
            <Preview>{subject}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: '#e11f26',
                            },
                        },
                    },
                }}
            >
                <Body className="bg-gray-100 my-auto mx-auto font-sans px-4 py-6 w-full">
                    <Container className="w-full max-w-full bg-white p-6">
                        <Row className="justify-between items-center mb-4">
                            <Text className="text-primary text-2xl font-bold">
                                {subject}
                            </Text>
                            <Img
                                src={logo}
                                width="70"
                                height="70"
                                alt="National union of mine workers"
                                className="my-0"
                            />
                        </Row>
                        <Section className="mb-4">
                            {recipientName && (
                                <Text className="text-black text-lg mb-4">
                                    Dear {recipientName},
                                </Text>
                            )}
                            {paragraphs.map((text, i) => (
                                <Text
                                    dangerouslySetInnerHTML={{ __html: text }}
                                    key={i}
                                    className="text-black text-lg mb-4"
                                />
                            ))}
                        </Section>
                        <Text className="text-black text-lg mb-4">
                            Best Regards, <br /> NUM Team
                        </Text>
                        <Container className="bg-gray-200 py-4 text-xs text-center">
                            <Text className="text-gray-600">
                                National Union of Mine Workers
                                <br />
                                {info.address}
                                <br />
                                Phone: {info.phone} | Email:{' '}
                                <Link href={`mailto:${info.email}`}>
                                    {info.email}
                                </Link>{' '}
                                | Website:{' '}
                                <Link href={info.website}>{info.website}</Link>
                            </Text>
                        </Container>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function renderEmail(props: Props) {
    return render(<EmailTemplate {...props} />);
}

EmailTemplate.PreviewProps = {
    subject: 'Welcome to Our Team',
    paragraphs: ['We are thrilled to have you on board.'],
} as Props;
