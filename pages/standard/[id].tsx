import React from 'react';
import { GetServerSideProps } from 'next';
import {
    getDataSchema,
    SchemaDataId,
    DataSchemaData,
} from '@htan/data-portal-schema';
import { HtanNavbar } from '../../components/HtanNavbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import DataSchema from '../../components/DataSchema';
import Footer from '../../components/Footer';

interface ManifestProps {
    schemaData: DataSchemaData;
    requiredDependencies: DataSchemaData[];
}

const Manifest: React.FC<ManifestProps> = ({
    schemaData,
    requiredDependencies,
}) => {
    return (
        <>
            <HtanNavbar />
            <Container>
                <Row style={{ marginBottom: 10 }}>
                    <Col>
                        <Link href="/standards">
                            <a>
                                <FontAwesomeIcon icon={faArrowLeft} />
                                &nbsp; Back to Data Standards
                            </a>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>{schemaData.attribute} Manifest</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataSchema
                            schemaData={requiredDependencies}
                            dataSchemaMap={requiredDependencies.reduce(
                                (acc, dep) => ({ ...acc, [dep.id]: dep }),
                                {}
                            )}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const { schemaDataById } = await getDataSchema([id as SchemaDataId]);
    const schemaData = schemaDataById[id];

    const requiredDependencies = await Promise.all(
        (schemaData.requiredDependencies || []).map(
            async (depId: string | { '@id': string }) => {
                const depSchemaId =
                    typeof depId === 'string' ? depId : depId['@id'];
                const { schemaDataById } = await getDataSchema([
                    depSchemaId as SchemaDataId,
                ]);
                return schemaDataById[depSchemaId];
            }
        )
    );

    return { props: { schemaData, requiredDependencies } };
};

export default Manifest;
