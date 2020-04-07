class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
    render json: @trainers
  end
  
  def create
    trainer = Trainer.create(name: params["name"])
    render json: trainer
  end

  def destroy
    trainer = Trainer.find(params["id"])
    trainer.destroy
    render json: trainer
  end
end
