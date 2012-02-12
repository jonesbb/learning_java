class PagesController < ApplicationController
  def home
    @title = "Home"
  end

  def about
    @title = "About"
  end

  def contact
    @title = "Contact"
  end

  def blog
    @title = "Blog"
  end

  def flightprojects
    @title = "Flight Projects"
  end

  def hackings
    @title = "Hackings"
  end

end
