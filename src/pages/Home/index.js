import React, {useState, useEffect} from 'react';
import {SearchArea, PageArea} from './styled';
import {PageContainer} from '../../components/mainComponents';
import AdItem from '../../components/partials/AdItem';
import {Link} from 'react-router-dom';
import useAPI from '../../helpers/OlxAPI';
const Page = () =>{
	const api = useAPI();
	
	const [stateList, setStateList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [adList, setAdList] = useState([]);
	useEffect(()=>{
		const getStates = async ()=>{
			const sList = await api.getStates();
			setStateList(sList);
		}
		getStates();
	},[]);

	useEffect(()=>{
		const getCategories = async ()=>{
			const cats = await api.getCategories();
			setCategories(cats);
		}
		getCategories();
	},[]);

	useEffect(()=>{
		const getRecentAds = async ()=>{
			const json = await api.getAds({
				sort: 'desc',
				limit: 8
			});
			setAdList(json.ads);
		}
		getRecentAds();
	},[]);

	return (
		<>
			<SearchArea>
				<PageContainer>
					<div className="searchBox">
						<form method="GET" action="/ads">
							<input type="text" name="q" placeholder="O que você procura?"/>
							<select name="state">
								{stateList.map((i,k)=>
										<option key={k} value={i.name}>{i.name}</option>
									)}
							</select>
							<button>Pesquisar</button>
						</form>
					</div>
					<div className="categoryList">
						{categories.map((i,k)=>
								<Link to={`/ads?cats=${i.slug}`} key={k} className="categoryItem">
									<img src={i.img} alt=""/>
										<span>{i.name}</span>
								</Link>
							)}
					</div>
				</PageContainer>
			</SearchArea>

			<PageContainer>
				<PageArea>
					<h2>Anúncios recentes</h2>
					<div className="list">
						{adList.map((i,k)=>
							<AdItem key={k} data={i}/>
						)}
					</div>
					<Link to="/ads" className="seeAllLink">Ver todos</Link>

					<hr />
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</PageArea>
			</PageContainer>
		</>
		);
}

export default Page;