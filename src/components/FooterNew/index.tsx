import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './style.less'

const FooterNew = () => {
	return (
		<>
			<div className="footer">
				<div className="all">
					<div className="footer-wrap">
						<div className="footer-right">
							<div className="content-footer-right">
								<div className="columns">
									<div className="colum">
										<div className="content-guide">
											<h3 className="title">About</h3>
											<ul className="list-menu-ft">
												<li>
													<a href="#!">Docs</a>
												</li>
												<li>
													<a href="#!">Team</a>
												</li>
												<li>
													<a href="#!">Roadmap</a>
												</li>
												<li>
													<a href="#!">Github</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="colum">
										<div className="content-guide">
											<h3 className="title">Products</h3>
											<ul className="list-menu-ft">
												<li>
													<a
														href="https://metacivic.finance/#/swap"
														target="_blank"
														rel="noreferrer"
													>
														Exchange
													</a>
												</li>
												<li>
													<a
														href="https://metacivic.finance/#/pool"
														target="_blank"
														rel="noreferrer"
													>
														Add liquidity
													</a>
												</li>
												<li>
													<a
														href="https://metacivic.finance/#/swap"
														target="_blank"
														rel="noreferrer"
													>
														Farms
													</a>
												</li>
												<li>
													<a
														href="https://stake.metacivic.finance/#/farms"
														target="_blank"
														rel="noreferrer"
													>
														Start Pools
													</a>
												</li>
												<li>
													<a
														href="https://metacivic.finance/#/nft-megamarket"
														target="_blank"
														rel="noreferrer"
													>
														NFT
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="colum">
										<div className="content-guide">
											<h3 className="title">Service</h3>
											<ul className="list-menu-ft">
												<li>
													<a href="#!">GameFi</a>
												</li>
												<li>
													<a href="#!">Metaverse</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="colum">
										<div className="content-guide">
											<h3 className="title mar-b-15">Community</h3>
											<ul className="list-menu-ft">
												<li>
													<div className="box-img">
														<a className="h__boxIcon" href="#!">
															<i
																className="fa fa-paper-plane h__customIcon"
																aria-hidden="true"
															/>
														</a>

														<a
															className="h__boxIcon"
															href="https://twitter.com"
															target="_blank"
															rel="noreferrer"
														>
															<i
																className="fab fa-twitter h__customIcon"
																aria-hidden="true"
															/>
														</a>

														<a className="h__boxIcon" href="#!">
															<i
																className="fab fa-youtube h__customIcon"
																aria-hidden="true"
															/>
														</a>

														<a
															className="h__boxIcon"
															href="https://medium.com/"
															target="_blank"
															rel="noreferrer"
														>
															<i
																className="fab fa-medium-m h__customIcon"
																aria-hidden="true"
															/>
														</a>
													</div>
												</li>
												<li>
													<h3 className="title mar-b-15">Support 24/7</h3>
												</li>
												<li>
													<button type="button" className="btn-contact">
														Contact us
													</button>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="footer-left">
							<div className="content-footer-left">
								<div className="col-50">
									<div className="item-token">
										<div className="icon">
											<img src="logo-mini.svg" alt="" />
										</div>
										<div className="text">
											MCV <span className="value-token">$1.07</span>
										</div>
									</div>
									<div className="item-token">
										<div className="icon">
											<img src="/icon-meta.png" alt="" />
										</div>
										<div className="text">
											<button type="button" className="btn-bought">
												Buy MCV
											</button>
										</div>
									</div>
								</div>
								<div className="col-50">
									<ul className="list-supply">
										<li>
											<div className="text-sp-l">Max supply:</div>
											<div className="text-sp-r">1 000 000 000</div>
										</li>
										<li>
											<div className="text-sp-l">Total supply:</div>
											<div className="text-sp-r h__custom">0</div>
										</li>
										<li>
											<div className="text-sp-l">Circulating supply:</div>
											<div className="text-sp-r h__custom">0</div>
										</li>
										<li>
											<div className="text-sp-l">Total Burned:</div>
											<div className="text-sp-r h__custom">0</div>
										</li>
										<li>
											<div className="text-sp-l">Market Cap:</div>
											<div className="text-sp-r h__custom">$0</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="copy-right">
						Copyright © 2021 Metacivic.io All Rights Reserved
					</div>
				</div>
			</div>
		</>
	)
}
export default FooterNew
