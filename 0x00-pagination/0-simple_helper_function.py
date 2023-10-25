def index_range(page, page_size):
    if page <= 0 or page_size <= 0:
        return (0, 0)  # Invalid input, return an empty range
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)

# Example usage:
page = 3
page_size = 10
start, end = index_range(page, page_size)
print(f"Start Index: {start}, End Index: {end}")
