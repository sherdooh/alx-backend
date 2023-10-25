#!/usr/bin/env python3
"""This is a simple helper function"""


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """returns tuple of size two containing the start index and an end index rnage"""

    return (page * page_size - page_size, page * page_size)
