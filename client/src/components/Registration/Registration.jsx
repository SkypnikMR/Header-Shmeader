import React from 'react';
import PropTypes from 'prop-types';
import { regInputs } from '/src/contsants/componentsСonsts';
import { NavLink, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APP_ROUTES } from '/src/contsants/reactRoutes';
import { StRegDiv } from './styled';
import Form from '../UI/Form';
import Input from '../Ui/Input';
import Button from '../UI/Button';


const Registration = ({ sendRegistrationRequest, setRegistrationValue, fields }) => {
    const { t } = useTranslation();
    if (fields.success) return <Redirect to={APP_ROUTES.login} />;
    return (
        <StRegDiv>
            <Form>
                <p>{t('registration')}</p>
                {regInputs.map(input => (
                    <Input
                        width="80%"
                        id={input.id}
                        height="100px"
                        key={input.id}
                        name={input.id}
                        inputHeight="50px"
                        borderRadius="5px"
                        label={t(input.label)}
                        value={fields[input.id]}
                        onChange={setRegistrationValue}
                        placeholder={t(input.placeholder)}
                    />
                ))}
                <Button
                    height="50px"
                    content={t('regBtn')}
                    id="registration"
                    onClick={sendRegistrationRequest}
                />
                <span>
                    {t('regSpanText')}
                    <NavLink to={APP_ROUTES.login}>{t('regLinkText')}</NavLink>
                </span>
            </Form>
        </StRegDiv>
    );
};

Registration.propTypes = {
    sendRegistrationRequest: PropTypes.func.isRequired,
    setRegistrationValue: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
};

export default Registration;
