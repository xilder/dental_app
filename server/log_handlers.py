import logging
from logging.handlers import SMTPHandler
from config import config


formatter = logging.Formatter(fmt="%(asctime) - %(levelname) - %(message)")
file_handler = logging.FileHandler("epitome.log")
mail_handler = SMTPHandler(
    mailhost=("smtp.gmail.com", 587),
    fromaddr=config.dev.MAIL_DEFAULT_SENDER,
    toaddrs=["abel.fagbemi@med.uniben.edu"],
    subject="[EPITOME] New update in App",
    credentials=(config.dev.MAIL_DEFAULT_SENDER, config.dev.MAIL_PASSWORD),
)

file_handler.setFormatter(formatter)
mail_handler.setFormatter(formatter)
file_handler.setLevel(logging.INFO)
mail_handler.setLevel(logging.ERROR)
