import React from 'react';
import pluralize from 'pluralize';
import styles from './exploreSummary.module.scss';

pluralize.addPluralRule(/specimen$/i, 'specimens');

interface IExploreSummaryProps {
    summaryData: {
        values: any[];
        displayName: string;
    }[];
}

export const ExploreSummary: React.FunctionComponent<IExploreSummaryProps> = (
    props
) => {
    return (
        <>
            <div className={styles.summary}>
                <div>
                    <strong>Summary:</strong>
                </div>
                {props.summaryData.map((d) => (
                    <div key={d.displayName}>
                        {pluralize(d.displayName, d.values.length, true)}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ExploreSummary;
