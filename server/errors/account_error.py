class UnconfirmedAccountError(Exception):
    """
    A custom exception class.

    Args:
        message: The error message to be displayed.
        code: An optional error code.
    """

    def __init__(self, message):
        super().__init__(message)