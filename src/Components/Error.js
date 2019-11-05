import React from 'react'

const Error = () => {
    return (
        <>
            <h1>Uh oh, 404</h1>
            <div class="component">
				<ul class="align">
					<li>
						<figure class='book'>

							{/* Front */}

							<ul class='hardcover_front'>
								<li>
									<div class="coverDesign blue">
                                        <span class="ribbon">v 1.2</span>
										<h1>CSS</h1>
										<p>BOOK</p>
									</div>
								</li>
								<li></li>
							</ul>

							{/* Pages */}

							<ul class='page'>
								<li></li>
								<li>
									<a class="btn" href="#">Download</a>
								</li>
								<li></li>
								<li></li>
								<li></li>
							</ul>

							{/* Back */}

							<ul class='hardcover_back'>
								<li></li>
								<li></li>
							</ul>
							<ul class='book_spine'>
								<li></li>
								<li></li>
							</ul>
							<figcaption>
								<h1>Fivera.net</h1>
								<span>By Nikola Petrovic</span>
								<p>Website dedicated to sharing resources</p>
							</figcaption>
						</figure>
					</li>
                    <li>
						<figure class='book'>

							{/* Front */}

							<ul class='hardcover_front'>
								<li>
                                    <img src="" alt="" />
								</li>
								<li></li>
							</ul>

							{/* Pages */}

							<ul class='page'>
								<li></li>
								<li>
									<a class="btn" href="#">Download</a>
								</li>
								<li></li>
								<li></li>
								<li></li>
							</ul>

							{/* Back */}

							<ul class='hardcover_back'>
								<li></li>
								<li></li>
							</ul>
							<ul class='book_spine'>
								<li></li>
								<li></li>
							</ul>
							<figcaption>
								<h1>Fivera.net</h1>
								<span>By Nikola Petrovic</span>
								<p>Website dedicated to sharing resources</p>
							</figcaption>
						</figure>
					</li>
				</ul>
			</div>
        </>
    )
}

export default Error