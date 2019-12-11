import React from 'react';
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react'
import styled from 'styled-components';

import { UserDetailsContext } from '../../context/UserDetailsContext'
import { useLogoutMutation } from '../../generated/auth-graphql';
import { useRouter } from '../../hooks';
import { logout } from '../../services/auth.service';

interface Props {
	className?: string
}

const MenuBar = ({ className } : Props): JSX.Element => {
	const currentUser = useContext(UserDetailsContext);
	const [logoutMutation, { data, error }] = useLogoutMutation({ context: { uri : process.env.REACT_APP_AUTH_SERVER_GRAPHQL_URL } });
	const { history } = useRouter();
	const { setUserDetailsContextState, username } = currentUser;

	useEffect(() => {
		if (data && data.logout && data.logout.message) {
			logout(setUserDetailsContextState);
			history.push('/');
		}

		if (error) console.error(error)

	},[data, error, history, setUserDetailsContextState])

	const handleLogout = () => {
		logoutMutation();
	}

	return (
		<Menu className={className} stackable inverted borderless>
			<Menu.Item as={Link} to="/" id='title'>Polkassembly</Menu.Item>
			<Menu.Item as={Link} to="/discussions" id='title'>Discussions</Menu.Item>
			<Menu.Item as={Link} to="/proposals" id='title'>Proposals</Menu.Item>
			<Menu.Menu position="right">
				{username
					? <>
						<Menu.Item><Icon name='user circle' inverted /> {username}</Menu.Item>
						<Menu.Item onClick={handleLogout}>Logout</Menu.Item>
					</>
					: <>
						<Menu.Item as={Link} to="/login">Login</Menu.Item >
						<Menu.Item as={Link} to="/signup">Sign-up</Menu.Item >
					</>
				}
			</Menu.Menu>
		</Menu>
	);
}

export default styled(MenuBar)`
.ui.menu {
	font-family: 'Roboto Mono';
	letter-spacing: 0.1rem;
	border-radius: 0;
	padding: 1.25rem 2.5rem;
}

.ui.menu .item {
	padding: 0 0;
}

.ui.inverted.menu {
	background-color: #282828;
}

#title {
	text-transform: uppercase;
}
`;